import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Không bỏ lỡ ...</h1>
      <span className="mailDesc">Đăng kí để nhận thông tin miễn phí, và những ưu đãi hấp dẫn nhất</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Email" />
        <button>Đăng kí</button>
      </div>
    </div>
  )
}

export default MailList