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
  FindInPageOutlined,
  StoreOutlined,
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
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Trang chủ</span>
            </li>
          </Link>

          <Link to={`/messenger`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Tin nhắn</span>
            </li>
          </Link>

          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li> */}
          <Link to={`/friend`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Bạn bè</span>
            </li>
          </Link>
          <hr className="sidebarHr" />
          <Link to={`/connect`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <PersonPin className="sidebarIcon" />
              <span className="sidebarListItemText">Kết nối làm quen</span>
            </li>
          </Link>
          {/* <Link to={`/search-user`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <FindInPageOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Tìm kiếm người dùng</span>
            </li>
          </Link> */}

          <Link to={`/market`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Market</span>
            </li>
          </Link>
          <Link to={`/deposits`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Giao dịch đặt cọc</span>
            </li>
          </Link>
          <hr className="sidebarHr" />
          {/* <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Về chúng tôi</span>
          </li> */}
          <Link to={`/manage-product`} style={{ textDecoration: "none" }}>
            <li className="sidebarListItem">
              <StoreOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Quản lý tin bán</span>
            </li>
          </Link>
          <Link to="/predict-price">
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Dự đoán giá nhà</span>
            </li>
          </Link>
        </ul>
        <div className="sidebar__copyright">
          © Copyright {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
