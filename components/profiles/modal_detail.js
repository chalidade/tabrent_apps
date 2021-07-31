export default function ModalDetail({show, setShow, data}) {
    return (
    <Modal centered show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Detail Order</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        {/* <img style={{width: '100%', borderRadius: '10px'}} src={data.product_image_main !== null ? MAIN+data.product_image_main : "/profile/icon_no_picture.PNG"} /> */}
        <div className="">
          <p className="m-1"><font style={{fontSize: '12px'}}>Name :</font> <br /> <b>{data.user_first_name + " " + data.user_last_name}</b></p>
          <p className="m-1"><font style={{fontSize: '12px'}}>Phone :</font> <br /> <b>{data.user_phone_number}</b></p>
          <p className="m-1"><font style={{fontSize: '12px'}}>Email :</font> <br /> <b>{data.user_email}</b></p>
          <p className="m-1"><font style={{fontSize: '12px'}}>Username :</font> <br /> <b>{data.user_username}</b></p>
          <p className="m-1"><font style={{fontSize: '12px'}}>Birthday :</font> <br /> <b>{data.user_birthdate}</b></p>
          <hr className="m-0 p-0" />
          <p className="m-1"><font style={{fontSize: '12px'}}>User Personal ID :</font> <br /> <b>{data.user_personal_id_number}</b></p>
          <p className="m-1"><font style={{fontSize: '12px'}}>User Bank Number :</font> <br /> <b>{data.user_bank_number ? data.user_bank_number : "-" }</b></p>
          <p className="m-1"><font style={{fontSize: '12px'}}>User Bank Type :</font> <br /> <b>{data.user_bank_type ? data.user_bank_type : "-"}</b></p>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger" variant="secondary" onClick={()=>setShow(false)}>
          Close
        </Button>
        {/* <Button id={data.order_id} onClick={(e) => handleProcess(e)} variant="success">
          Return
        </Button> */}
      </Modal.Footer>
    </Modal>)
    ;
}