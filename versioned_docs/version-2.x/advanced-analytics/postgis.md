---
title: Geospatial Analytics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Geospatial Analytics

[PostGIS](https://postgis.net/) extends the capabilities of the PostgreSQL by adding support for storing, indexing, and querying geospatial data. Apache Cloudberry supports PostGIS for geospatial analytics.

This document introduces how to compile and build PostGIS for your Apache Cloudberry cluster.

You can access the PostGIS for Apache Cloudberry project repo at [`cloudberry-contrib/postgis`](https://github.com/cloudberry-contrib/postgis). The PostGIS code in this repo is dedicated to Apache Cloudberry. The compilation and building method introduced in this document is based on the code of this repo.

:::note
This repo is contributed by the community members and customized for Cloudberry, but please note that it is not maintained as one official Cloudberry project.
:::

## Compile PostGIS for Apache Cloudberry

This document describes how to compile and build PostGIS 3.3.2 for Apache Cloudberry.

Before installing PostGIS for Apache Cloudberry, install the required dependencies and compile several components. This process is tested and supported on Rocky Linux 8 & Rocky Linux 9.

Before you get started, ensure that the Apache Cloudberry is correctly installed on your machine. If it is not installed, see the [documentation](https://cloudberry.apache.org/docs/) for installation instructions.

The following steps will be operated under the `gpadmin` user. Please make sure you are using the `gpadmin` user to operate the commands. If not, you can swithch to the `gpadmin` user by running the `su - gpadmin` command.

### 1. Install the pre-requested dependencies via the package manager.

    <Tabs>
    <TabItem value="rocky-linux8" label="For Rocky Linux 8" default>
    ```bash
    sudo dnf install -y libxml2-devel json-c pkg-config gettext \
        protobuf-c gmp-devel boost-devel automake libtool make \
        gcc gcc-c++ sqlite-devel mpfr-devel bzip2 xz libcurl-devel \
        cmake protobuf-c-devel libxslt

    sudo dnf install -y --enablerepo=devel protobuf-devel
    ```
    </TabItem>
    <TabItem value="rocky-linux9" label="Rocky Linux 9">
    ```bash
    sudo dnf install -y libxml2-devel json-c pkg-config gettext \
        protobuf-c gmp-devel boost-devel automake libtool make \
        gcc gcc-c++ sqlite-devel mpfr-devel bzip2 xz libcurl-devel \
        cmake libxslt

    sudo dnf install --enablerepo=crb protobuf-c-devel
    ```
    </TabItem>
    </Tabs>

### 2. Build the components (GDAL, CGAL, SFCGAL, and GEOS).

Key dependencies include, which will be built from source:

* proj: 5.2.0+
* GEOS: 3.11+
* gdal: 3+
* cgal: 5.3+
* sfcgal: 1.4.1+

1. Build GDAL.

    [GDAL](https://gdal.org/index.html) is a translator library for raster and vector geospatial data formats. 

    We need to install [proj](https://proj.org/) first, which is a library for performing conversions between geospatial coordinates and is a dependency of GDAL. Follow the commands to install proj 6.0.0:

      ```bash
      wget https://download.osgeo.org/proj/proj-6.0.0.tar.gz
      tar -xzf proj-6.0.0.tar.gz
      cd proj-6.0.0
      ./configure --prefix=/usr/local/proj6
      make -j$(nproc) && sudo make -j$(nproc) install
      ```

    Then build GDAL 3.5.3:

      ```bash
      wget https://download.osgeo.org/gdal/3.5.3/gdal-3.5.3.tar.gz
      tar xf gdal-3.5.3.tar.gz
      cd gdal-3.5.3
      ./configure --prefix=/usr/local/gdal-3.5.3 \
        --with-proj=/usr/local/proj6
      make -j$(nproc) && sudo make -j$(nproc) install
      ```

2. Build CGAL.

    [CGAL](https://www.cgal.org/) provides easy access to efficient and reliable geometric algorithms in the form of a C++ library. Follow the commands to install it:

    ```bash
    wget https://github.com/CGAL/cgal/releases/download/v5.6.1/CGAL-5.6.1.tar.xz
    tar -xf CGAL-5.6.1.tar.xz
    cd CGAL-5.6.1
    mkdir build && cd build
    cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local/cgal-5.6.1 ..
    make -j$(nproc) && sudo make -j$(nproc) install
    ```

3. Build SFCGAL.

    [SFCGAL](https://github.com/Oslandia/SFCGAL) is a C++ wrapper library around CGAL to support ISO 19107:2013 and OGC Simple Features Access 1.2 for 3D operations. Follow the commands to install it:

    ```bash
    wget https://gitlab.com/sfcgal/SFCGAL/-/archive/v1.4.1/SFCGAL-v1.4.1.tar.gz
    tar xf SFCGAL-v1.4.1.tar.gz
    cd SFCGAL-v1.4.1
    mkdir build && cd build
    cmake -DCMAKE_INSTALL_PREFIX=/usr/local/sfcgal-1.4.1 ..
    make -j$(nproc) && sudo make -j$(nproc) install
    ```

4. Build GEOS.

    [GEOS](https://libgeos.org/) is a C/C++ library for computational geometry with a focus on algorithms used in geographic information systems (GIS) software. Follow the commands to install it:

    ```bash
    wget https://download.osgeo.org/geos/geos-3.11.0.tar.bz2
    tar xf geos-3.11.0.tar.bz2
    cd geos-3.11.0
    mkdir build && cd build
    cmake -DCMAKE_INSTALL_PREFIX=/usr/local/geos-3.11.0 ..
    make -j$(nproc) && sudo make -j$(nproc) install
    ```

5. Update `/etc/ld.so.conf`.

    After installing the above components, update `/etc/ld.so.conf` to configure the dynamic loader to search for their directories:

    ```bash
    sudo vi /etc/ld.so.conf
    ```

    Add the following lines to the end of the file:

    ```bash 
    /usr/lib/
    /usr/lib64/
    /usr/local/sfcgal-1.4.1/lib64/
    /usr/local/gdal-3.5.3/lib/
    /usr/local/geos-3.11.0/lib64/
    /usr/local/proj6/lib/
    ```

    Then run the command to update the dynamic loader cache:

    ```bash
    sudo ldconfig
    ```

### 3. Build and install PostGIS.

1. Download the `cloudberry-contrib/postgis` repo to your `/home/gpadmin` directory:

     ```bash
     git clone https://github.com/cloudberry-contrib/postgis.git /home/gpadmin/postgis
     ```

2. Compile PostGIS.

     Before starting the compilation process, run the following commands to make sure the environment variables are set ready (in the gpdemo environment):

     ```bash
     source /usr/local/cloudberry-db/cloudberry-env.sh
     source /home/gpadmin/cloudberry/gpAux/gpdemo/gpdemo-env.sh
     ```

     Then continue:

     ```bash
     cd /home/gpadmin/postgis/postgis/build/postgis-3.3.2/
     ./autogen.sh
     ./configure --with-pgconfig="${GPHOME}"/bin/pg_config \
       --with-raster --without-topology \
       --with-gdalconfig=/usr/local/gdal-3.5.3/bin/gdal-config \
       --with-sfcgal=/usr/local/sfcgal-1.4.1/bin/sfcgal-config \
       --with-geosconfig=/usr/local/geos-3.11.0/bin/geos-config \
       --with-projdir=/usr/local/proj6/
     make -j$(nproc) && sudo make -j$(nproc) install
     ```

## Use PostGIS in Apache Cloudberry

After you have compiled and built PostGIS and the supporting extensions successfully on your Apache Cloudberry cluster and have started the demo cluster, you can run the following commands to enable PostGIS and the supporting extensions:

```sql
$ psql -p 7000 postgres

postgres=# CREATE EXTENSION postgis;     -- Enables PostGIS and raster
postgres=# CREATE EXTENSION fuzzystrmatch;     -- Required for installing Tiger Geocoder
postgres=# CREATE EXTENSION plpython3u; -- Required for installing Tiger Geocoder
postgres=# CREATE EXTENSION postgis_tiger_geocoder;     -- Enables Tiger Geocoder
postgres=# CREATE EXTENSION address_standardizer;     -- Enables address_standardizer
postgres=# CREATE EXTENSION address_standardizer_data_us;
```

The following example uses PostGIS to create non-OpenGIS tables in the database, and insert and query geometric objects.

```sql
-- Creates a table named geom_test.
CREATE TABLE geom_test ( gid int4, geom geometry, 
  name varchar(25) );

-- Inserts a row into the table. The gid is 1, the geometry field represents a three-dimensional polygon object (a 3D square) using WKT format, and the name is '3D Square'.
INSERT INTO geom_test ( gid, geom, name )
  VALUES ( 1, 'POLYGON((0 0 0,0 5 0,5 5 0,5 0 0,0 0 0))', '3D Square');
  
-- Inserts the second row. The gid is 2, the geometry is a three-dimensional line string, and the name is '3D Line'.
INSERT INTO geom_test ( gid, geom, name ) 
  VALUES ( 2, 'LINESTRING(1 1 1,5 5 5,7 7 5)', '3D Line' );
  
-- Inserts the third row. The gid is 3, the geometry is a two-dimensional multi-point object, and the name is '2D Aggregate Point'.
INSERT INTO geom_test ( gid, geom, name )
  VALUES ( 3, 'MULTIPOINT(3 4,8 9)', '2D Aggregate Point' );

-- Uses ST_GeomFromEWKT to build a three-dimensional lines tring object from EWKT, then use Box3D to get the three-dimensional bounding box of that object. Use the && operator to query all rows in the geom_test table whose geom field intersects with the bounding box.
SELECT * from geom_test WHERE geom &&
  Box3D(ST_GeomFromEWKT('LINESTRING(2 2 0, 3 3 0)'));
```

The following example uses PostGIS to create a table with geo-referenced data, inserts geo-coded point data, and outputs point data in standard text format.

```sql
-- Creates a table named geotest.
CREATE TABLE geotest (id INT4, name VARCHAR(32) );

-- Adds a geometry column named geopoint to the geotest table, defined as a POINT type with 2 dimensions, and specifies its Spatial Reference System (SRID) as 4326 (representing the WGS84 geographic coordinate system).
SELECT AddGeometryColumn('geotest','geopoint', 4326,'POINT',2);

-- Inserts the first row. The id is 1, the name is 'Olympia', and geopoint is a point object build from WKT text using ST_GeometryFromText with coordinates (-122.90, 46.97) and SRID 4326.
INSERT INTO geotest (id, name, geopoint)
  VALUES (1, 'Olympia', ST_GeometryFromText('POINT(-122.90 46.97)', 4326));
  
-- Inserts the second row. The id is 2, the name is 'Renton', with point coordinates (-122.22, 47.50) and the same SRID of 4326.
INSERT INTO geotest (id, name, geopoint)
  VALUES (2, 'Renton', ST_GeometryFromText('POINT(-122.22 47.50)', 4326));

-- Selects the name and geopoint fields from the geotest table, but converts the geopoint field to standard text (WKT) format using the ST_AsText function.
SELECT name,ST_AsText(geopoint) FROM geotest;
```

The following example uses the spatial indexing feature.

```sql
-- Creates table.
CREATE TABLE spatial_data (
  id SERIAL PRIMARY KEY,
  geom geometry
);

-- Inserts data.
INSERT INTO spatial_data (geom) VALUES 
(ST_GeomFromText('POINT(0 0)')),
(ST_GeomFromText('POINT(1 1)')),
(ST_GeomFromText('POLYGON((0 0, 4 0, 4 4, 0 4, 0 0))'));

-- Creates spatial index.
CREATE INDEX spatial_data_gist_idx
  ON spatial_data
  USING GIST (geom);
```

For more usages, you can follow the [PostGIS manual](https://postgis.net/documentation/manual/).
