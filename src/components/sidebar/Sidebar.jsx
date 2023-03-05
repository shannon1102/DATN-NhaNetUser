import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PersonPin,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css";
export default function Sidebar() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      paperSidebar: {
        width: "100%",
        height: "60px",
        maxWidth: "350px",
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: "10px",
      },
    })
  );
  const classes = useStyles();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Trang chủ</span>
          </li>

          <Link to={`/messenger`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Tin nhắn</span>
            </li>
          </Link>

          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <Link to={`/friend`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Bạn bè</span>
            </li>
          </Link>

          <hr className="sidebarHr" />
          <Link to={`/market`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Market</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Lịch trình</span>
          </li>

          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>

          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <hr className="sidebarHr" />
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
        </ul>
        <div className="sidebar__copyright">
          © Copyright {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
