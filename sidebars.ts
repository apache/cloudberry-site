import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want. 
 */
const sidebars: SidebarsConfig = {
  docsbars: [

    {
      type: 'category',
      label: 'Introduction',
      items: ['cbdb-overview','cbdb-architecture','cbdb-scenarios','cbdb-vs-gp-features']
     },

    {
      type: 'category',
      label: 'Deploy and Build',
      items: [
      {
        type: 'category',
        label: 'Build from Source Code',
        items: ['cbdb-macos-compile','cbdb-rockylinux8-ubuntu-compile','cbdb-rockylinux9-compile']
      },
      {
        type: 'category',
        label: 'Deploy on Physical or Virtual Machine',
        items: ['cbdb-op-software-hardware', 'cbdb-op-prepare-to-deploy', 'cbdb-op-deploy-guide','deploy-cbdb-with-single-node']
      }
     ]
    },

    {
      type: 'category',
      label: 'Load Data',
      link: {
        type: "doc",
        id: 'data-loading/index',
    },
      items: [
      {
        type: 'category',
        label: 'Load Data from Local Files',
        items: ['data-loading/load-data-using-copy', 'data-loading/load-data-using-gpfdist', 'data-loading/load-data-using-file-protocol','data-loading/load-data-using-gpload']
      },
      'data-loading/load-data-from-web-services', 'data-loading/load-data-from-kafka-using-fdw']
    },

    {
      type: 'category',
      label: 'Create and Prepare',
      items: ['create-and-manage-database','start-and-stop-cbdb-database','connect-to-cbdb']
    },

    {
      type: 'category',
      label: 'Operate with Data',
      items: [
        {
        type: 'category',
        label: 'Operate with Database Objects',
        items: ['basic-query-syntax', 'create-and-manage-tablespaces', 'create-and-manage-tables','create-and-manage-schemas','create-and-manage-views','create-and-manage-materialized-views','create-and-manage-indexes','brin-indexes','insert-update-delete-rows','work-with-transactions','transactional-concurrency-control']
        },
        {
        type: 'category',
        label: 'SQL Queries',
        items: ['join-queries']
        },
        'table-storage-models',

      {
        type: 'category',
        label: 'Advanced Analytics',
        items: ['advanced-analytics/postgis','advanced-analytics/directory-tables', 'advanced-analytics/pgvector-search']
      }
      ]
     },

     {
       type: 'category',
       label: 'Optimize Performance',
       link: {
        type: "doc",
        id: 'performance/index',
      },
       items: [
        {
        type: 'category',
        label: 'Optimize Query Performance',
        items:[
          {
            type: 'category',
            label: 'GPORCA Query Optimizer',
            items: ['performance/optimize-queries/use-orca/use-orca-overview', 'performance/optimize-queries/use-orca/orca-features','performance/optimize-queries/use-orca/whats-new-in-orca']
          },
         'performance/optimize-queries/use-unique-index-on-ao-tables', 'performance/optimize-queries/use-auto-materialized-view-to-answer-queries', 'performance/optimize-queries/use-incremental-materialized-view', 'performance/optimize-queries/parallel-create-ao-refresh-mv', 'performance/optimize-queries/parallel-query-execution', 'performance/optimize-queries/use-aggre-pushdown-to-speed-up-queries', 'performance/optimize-queries/use-index-scan-on-ao-tables', 'performance/optimize-queries/use-runtimefilter-to-optimize-queries','performance/optimize-queries/query-hints']
        },
        'performance/update-stats-using-analyze', 'performance/use-columnar-compression', 'performance/manage-resources-using-resource-groups', 'performance/use-dynamic-tables']
     },

     {
       type: 'category',
       label: 'Security and Permission',
       link: {
          type: "doc",
          id: 'security/index',
      },
       items: [
        'security/manage-roles-and-privileges', 
        'security/client-auth', 
        'security/configure-row-level-security-policy',
        'security/protect-passwords',
        'security/set-password-profile',
        'security/transparent-data-encryption']
     },

     {
      type: 'category',
      label: 'Manage System',
      items: [
        {
        type: 'category',
        label: 'Backup and Restore',
        link: {
          type: "doc",
          id: 'sys-admin/backup-and-restore/index',
      },
        items: ['sys-admin/backup-and-restore/perform-full-backup-and-restore', 'sys-admin/backup-and-restore/perform-incremental-backup-and-restore']
       },
        'sys-admin/configure-database-system', 'sys-admin/check-database-system', 'sys-admin/enable-coordinator-mirroring', 'sys-admin/recommended-maintenance-monitoring-tasks']
     },

     {
      type: 'category',
      label: 'Developer',
      items: ['developer/develop-extensions-using-rust']
     },

     {
      type: 'category',
      label: 'Ecosystem',
      items: [
        {
        type: 'category',
        label: 'SQL Clients',
        items: ['ecosystem/sql-clients/dbeaver']
       },
        ]
     },

    {
      type: 'category',
      label: 'References',
      items: [
      {
        type: 'category',
        label: 'SQL Statements',
        link: {
          type: "doc",
          id: 'sql-stmts/index',
        },
        items: [
          'sql-stmts/abort',
          'sql-stmts/alter-aggregate',
          'sql-stmts/alter-collation',
          'sql-stmts/alter-conversion',
          'sql-stmts/alter-database',
          'sql-stmts/alter-default-privileges',
          'sql-stmts/alter-domain',
          'sql-stmts/alter-extension',
          'sql-stmts/alter-external-table',
          'sql-stmts/alter-foreign-data-wrapper',
          'sql-stmts/alter-foreign-table',
          'sql-stmts/alter-function',
          'sql-stmts/alter-group',
          'sql-stmts/alter-index',
          'sql-stmts/alter-language',
          'sql-stmts/alter-materialized-view',
          'sql-stmts/alter-operator-class',
          'sql-stmts/alter-operator-family',
          'sql-stmts/alter-operator',
          'sql-stmts/alter-policy',
          'sql-stmts/alter-procedure',
          'sql-stmts/alter-protocol',
          'sql-stmts/alter-resource-group',
          'sql-stmts/alter-resource-queue',
          'sql-stmts/alter-role',
          'sql-stmts/alter-routine',
          'sql-stmts/alter-rule',
          'sql-stmts/alter-schema',
          'sql-stmts/alter-sequence',
          'sql-stmts/alter-server',
          'sql-stmts/alter-statistics',
          'sql-stmts/alter-table',
          'sql-stmts/alter-tablespace',
          'sql-stmts/alter-text-search-configuration',
          'sql-stmts/alter-text-search-dictionary',
          'sql-stmts/alter-text-search-parser',
          'sql-stmts/alter-text-search-template',
          'sql-stmts/alter-trigger',
          'sql-stmts/alter-type',
          'sql-stmts/alter-user-mapping',
          'sql-stmts/alter-user',
          'sql-stmts/alter-view',
          'sql-stmts/analyze',
          'sql-stmts/begin',
          'sql-stmts/call',
          'sql-stmts/checkpoint',
          'sql-stmts/close',
          'sql-stmts/cluster',
          'sql-stmts/comment',
          'sql-stmts/commit',
          'sql-stmts/copy',
          'sql-stmts/create-access-method',
          'sql-stmts/create-aggregate',
          'sql-stmts/create-cast',
          'sql-stmts/create-collation',
          'sql-stmts/create-conversion',
          'sql-stmts/create-database',
          'sql-stmts/create-domain',
          'sql-stmts/create-extension',
          'sql-stmts/create-external-table',
          'sql-stmts/create-foreign-data-wrapper',
          'sql-stmts/create-foreign-table',
          'sql-stmts/create-function',
          'sql-stmts/create-group',
          'sql-stmts/create-index',
          'sql-stmts/create-language',
          'sql-stmts/create-materialized-view',
          'sql-stmts/create-operator-class',
          'sql-stmts/create-operator-family',
          'sql-stmts/create-operator',
          'sql-stmts/create-policy',
          'sql-stmts/create-procedure',
          'sql-stmts/create-protocol',
          'sql-stmts/create-resource-group',
          'sql-stmts/create-resource-queue',
          'sql-stmts/create-role',
          'sql-stmts/create-rule',
          'sql-stmts/create-schema',
          'sql-stmts/create-sequence',
          'sql-stmts/create-server',
          'sql-stmts/create-statistics',
          'sql-stmts/create-table-as',
          'sql-stmts/create-table',
          'sql-stmts/create-tablespace',
          'sql-stmts/create-text-search-configuration',
          'sql-stmts/create-text-search-dictionary',
          'sql-stmts/create-text-search-parser',
          'sql-stmts/create-text-search-template',
          'sql-stmts/create-transform',
          'sql-stmts/create-trigger',
          'sql-stmts/create-type',
          'sql-stmts/create-user-mapping',
          'sql-stmts/create-user',
          'sql-stmts/create-view',
          'sql-stmts/deallocate',
          'sql-stmts/declare',
          'sql-stmts/delete',
          'sql-stmts/discard',
          'sql-stmts/do',
          'sql-stmts/drop-access-method',
          'sql-stmts/drop-aggregate',
          'sql-stmts/drop-cast',
          'sql-stmts/drop-collation',
          'sql-stmts/drop-conversion',
          'sql-stmts/drop-database',
          'sql-stmts/drop-domain',
          'sql-stmts/drop-extension',
          'sql-stmts/drop-external-table',
          'sql-stmts/drop-foreign-data-wrapper',
          'sql-stmts/drop-foreign-table',
          'sql-stmts/drop-function',
          'sql-stmts/drop-group',
          'sql-stmts/drop-index',
          'sql-stmts/drop-language',
          'sql-stmts/drop-materialized-view',
          'sql-stmts/drop-operator-class',
          'sql-stmts/drop-operator-family',
          'sql-stmts/drop-operator',
          'sql-stmts/drop-owned',
          'sql-stmts/drop-policy',
          'sql-stmts/drop-procedure',
          'sql-stmts/drop-protocol',
          'sql-stmts/drop-resource-group',
          'sql-stmts/drop-resource-queue',
          'sql-stmts/drop-role',
          'sql-stmts/drop-routine',
          'sql-stmts/drop-rule',
          'sql-stmts/drop-schema',
          'sql-stmts/drop-sequence',
          'sql-stmts/drop-server',
          'sql-stmts/drop-statistics',
          'sql-stmts/drop-table',
          'sql-stmts/drop-tablespace',
          'sql-stmts/drop-text-search-configuration',
          'sql-stmts/drop-text-search-dictionary',
          'sql-stmts/drop-text-search-parser',
          'sql-stmts/drop-text-search-template',
          'sql-stmts/drop-transform',
          'sql-stmts/drop-trigger',
          'sql-stmts/drop-type',
          'sql-stmts/drop-user-mapping',
          'sql-stmts/drop-user',
          'sql-stmts/drop-view',
          'sql-stmts/end',
          'sql-stmts/execute',
          'sql-stmts/explain',
          'sql-stmts/fetch',
          'sql-stmts/grant',
          'sql-stmts/import-foreign-schema',
          'sql-stmts/insert',
          'sql-stmts/listen',
          'sql-stmts/load',
          'sql-stmts/lock',
          'sql-stmts/move',
          'sql-stmts/notify',
          'sql-stmts/prepare',
          'sql-stmts/reassign-owned',
          'sql-stmts/refresh-materialized-view',
          'sql-stmts/reindex',
          'sql-stmts/release-savepoint',
          'sql-stmts/reset',
          'sql-stmts/retrieve',
          'sql-stmts/revoke',
          'sql-stmts/rollback-to-savepoint',
          'sql-stmts/rollback',
          'sql-stmts/savepoint',
          'sql-stmts/select-into',
          'sql-stmts/select',
          'sql-stmts/set-constraints',
          'sql-stmts/set-role',
          'sql-stmts/set-session-authorization',
          'sql-stmts/set-transaction',
          'sql-stmts/set',
          'sql-stmts/show',
          'sql-stmts/start-transaction',
          'sql-stmts/truncate',
          'sql-stmts/unlisten',
          'sql-stmts/update',
          'sql-stmts/vacuum',
          'sql-stmts/values',
        ]
      },

        'data-types',

      {
        type: 'category',
        label: 'Built-in Functions',
        link: {
          type: "doc",
          id: 'functions/index',
        },
        items: [
                'functions/json-functions-and-operators',
                'functions/window-functions',
                'functions/advanced-aggregate-functions',
                'functions/text-search-functions-and-operators',
                'functions/range-functions-and-operators',
        ]
      },

      {
        type: 'category',
        label: 'System Utilities',
        link: {
          type: "doc",
          id: 'sys-utilities/index',
        },
        items: [
                'sys-utilities/analyzedb',
                'sys-utilities/clusterdb',
                'sys-utilities/createuser',
                'sys-utilities/createdb',
                'sys-utilities/gpaddmirrors',
                'sys-utilities/gpbackup',
                'sys-utilities/gpcheckcat',
                'sys-utilities/gpcheckperf',
                'sys-utilities/gpconfig',
                'sys-utilities/gpdeletesystem',
                'sys-utilities/gpdemo',
                'sys-utilities/gpexpand',
                'sys-utilities/gpfdist',
                'sys-utilities/gpinitstandby',
                'sys-utilities/gpinitsystem',
                'sys-utilities/gpload',
                'sys-utilities/gplogfilter',
                'sys-utilities/gpmemreport',
                'sys-utilities/gpmemwatcher',
                'sys-utilities/gpmovemirrors',
                'sys-utilities/gppkg',
                'sys-utilities/gprestore',
                'sys-utilities/gpreload',
                'sys-utilities/gprecoverseg',
                'sys-utilities/gpshrink',
                'sys-utilities/gpssh-exkeys',
                'sys-utilities/gpssh',
                'sys-utilities/gpstart',
                'sys-utilities/gpstate',
                'sys-utilities/gpstop',
                'sys-utilities/gpsync',
                'sys-utilities/pg-checksums',
                'sys-utilities/pg-config',
                'sys-utilities/pg-dump',
                'sys-utilities/pg-dumpall',
                'sys-utilities/pg-filedump',
                'sys-utilities/psql',
                'sys-utilities/reindexdb',
                'sys-utilities/vacuumdb',
                'sys-utilities/dropdb',
                'sys-utilities/dropuser',
                'sys-utilities/gpactivatestandby']
       },

       {
        type: 'category',
        label: 'System Catalogs',
        items: [
          {
            type: 'category',
            label: 'System Tables',
            items: [
              'sys-catalogs/sys-tables/gp-configuration-history',
              'sys-catalogs/sys-tables/gp-distribution-policy',
              'sys-catalogs/sys-tables/gp-fastsequence',
              'sys-catalogs/sys-tables/gp-id',
              'sys-catalogs/sys-tables/gp-partition-template',
              'sys-catalogs/sys-tables/gp-segment-configuration',
              'sys-catalogs/sys-tables/gp-version-at-initdb',
              'sys-catalogs/sys-tables/pg-aggregate',
              'sys-catalogs/sys-tables/pg-am',
              'sys-catalogs/sys-tables/pg-amop',
              'sys-catalogs/sys-tables/pg-amproc',
              'sys-catalogs/sys-tables/pg-appendonly',
              'sys-catalogs/sys-tables/pg-attribute',
              'sys-catalogs/sys-tables/pg-attribute-encoding',
              'sys-catalogs/sys-tables/pg-attridef',
              'sys-catalogs/sys-tables/pg-auth-members',
              'sys-catalogs/sys-tables/pg-authid',
              'sys-catalogs/sys-tables/pg-depend',
              'sys-catalogs/sys-tables/pg-description',
              'sys-catalogs/sys-tables/pg-cast',
              'sys-catalogs/sys-tables/pg-class',
              'sys-catalogs/sys-tables/pg-namespace',
              'sys-catalogs/sys-tables/pg-operator',
              'sys-catalogs/sys-tables/pg-partitioned-table',
              'sys-catalogs/sys-tables/pg-policy',
              'sys-catalogs/sys-tables/pg-proc',
              'sys-catalogs/sys-tables/pg-resgroup',
              'sys-catalogs/sys-tables/pg-resgroupcapability',
              'sys-catalogs/sys-tables/pg-resourcetype',
              'sys-catalogs/sys-tables/pg-resqueue',
              'sys-catalogs/sys-tables/pg-resqueuecapability',
              'sys-catalogs/sys-tables/pg-rewrite',
              'sys-catalogs/sys-tables/pg-sequence',
              'sys-catalogs/sys-tables/pg-shdepend',
              'sys-catalogs/sys-tables/pg-shdescription',
              'sys-catalogs/sys-tables/pg-stat-last-operation',
              'sys-catalogs/sys-tables/pg-stat-last-shoperation',
              'sys-catalogs/sys-tables/pg-statistic',
              'sys-catalogs/sys-tables/pg-statistic-ext',
              'sys-catalogs/sys-tables/pg-statistic-ext-data',
              'sys-catalogs/sys-tables/pg-tablespace',
              'sys-catalogs/sys-tables/pg-trigger',
              'sys-catalogs/sys-tables/pg-type',
              'sys-catalogs/sys-tables/pg-type-encoding',
              'sys-catalogs/sys-tables/pg-user-mapping',
            ]
          }
    ]
       },
     ]
    },

    {
      type: "category",
      label: "Releases",
      items: [
        "releases/index"
      ]
    },
  ]
}

export default sidebars;
