import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "../../components/globals/top_nav";
import { fetch_data } from "../../components/globals/api";
import { STORE, INDEX, MAIN } from "../../config/api_url";
import { useRouter } from "next/router";

export default function OrderDate() {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [photo, setPhoto] = useState(); 

  const handleSave = () => {
    let json = {
    action: "save",
    db: "tabrent",
    table: "tx_banner",
    primaryKey: "banner_id",
    value: [{
          banner_id: null,
          banner_title: title,
          banner_desc: desc,
          banner_status: 1
          }]
    }

    fetch_data(STORE, json).then(function (data) {
      if (data.success) {
        let id = data.id;
        let json_upload = {
          action: "upload_base64",
          db: "tabrent",
          table: "tx_banner",
          where: [
              [
                  "banner_id",
                  "=",
                  id
              ]
          ],
          main : false,
          update : "banner_image",
          value : photo
      }

        fetch_data(STORE, json_upload).then(function (data) {
          if (data.success) {
            console.log("Upload Image Success");
          } else {
            console.log("Upload Image Failed");
          }
        });

        alert("New Banner Created");
        router.push('/profile/list_banner');
      } else {
        alert("New Banner Failed");
        router.push('/profile/list_banner');
      }
    });
  }

  const handlePhoto = (e) => {
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if(allFiles.length == files.length){
            setPhoto(allFiles);
        }
      }
    }
  }

  return (
    <div style={{ background: "#2F2F8D", overflow: "hidden" }}>
      <TopNav back="true" text="Back" arrow="true" background={false} />
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          top: "0vh",
        }}
      >
        <img src="/profile/icon_circle.svg" style={{ width: "100%" }} />
      </div>
      <div className="profile-main" style={{ overflow: "hidden", top: "20vh", minHeight: '90vh' }}>
        <center>
          <p className="weight-700 color-primary" style={{ fontSize: "20px" }}>
            New Banner
          </p>
        </center>
        <p className="mt-4 text-secondary weight-600">
          Title <br />
          <input onChange={(e)=> setTitle(e.target.value)} className="form-control mt-2 p-4" />
        </p>
        <p className="mt-4 text-secondary weight-600">
          Description <br />
          <textarea onChange={(e)=> setDesc(e.target.value)} className="form-control mt-2 p-4"> </textarea>
        </p>
        <p className="mt-4 text-secondary weight-600">
          Account Number <br />
          <input type="file" onChange={e => handlePhoto(e)} className="mt-2" />
        </p>
          <button onClick={() => handleSave()} className="button-primary p-3 w-100 mt-3">Save</button>
      </div>
      <div className="main"></div>
    </div>
  );
}
