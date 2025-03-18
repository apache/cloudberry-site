import CommonLayout from "../components/common/Layout";
import FrequentlyAskedQuestions from "../components/home/FrequentlyAskedQuestions";
import HCard from "../components/home/HCard";
import MeetTheCommunity from "../components/home/MeetTheCommunity";
import SlackWechatTwitterYoutube from "../components/home/SlackWechatTwitterYoutube";
import WantToContribute from "../components/home/WantToContribute";
import styles from "../css/pages/home.module.scss";
export default function Home(): JSX.Element {
  return (
    <CommonLayout>
      <div className="navbar-home-lighting">
        <HCard />
        <div className={styles.homeContentContainer}>
          <MeetTheCommunity />
          <SlackWechatTwitterYoutube />
          <WantToContribute />
          <FrequentlyAskedQuestions />
        </div>
      </div>
    </CommonLayout>
  );
}
