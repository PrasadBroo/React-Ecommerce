import React, { useState, useContext, useEffect } from "react";
import style from "../../css/subcss/Profile.module.css";
import { AuthunticateContext } from "../../contexts/AuthunticateContext";
import Loader from "../../components/Loader";
import { auth, firestore } from "../../services/firebase";

export default function Profile() {
  const { user, showloader, updateProfile } = useContext(AuthunticateContext);
  const [editMode, setEditMode] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobileNumber, setUserMobileNumber] = useState("+91123456789");
  const [userDateJoined, setUserDateJoined] = useState("2 Dec 1999");
  const [userFullName, setUserFullName] = useState("Iron Man");
  const [userProfilePic, setUserProfilePic] = useState(
    "https://i.ibb.co/p6DcH2M/default-Avatar-4e9edb2a624547982816014bf128fcd5.jpg"
  );

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
      setUserMobileNumber(user.phoneNumber ?? "+911245957139");
      setUserDateJoined(user.metadata.creationTime);
      setUserFullName(user.displayName ?? "Iron Man");
      fetchAddres();
    }
  }, [user]);
  return (
    <div className={style.profilesec}>
      <div className={style.topConatiner}>
        <div className={style.bcimg}>
          <img
            src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg"
            alt="background"
          />
        </div>
        <div className={style.profilePic}>
          <img src={userProfilePic} alt="mypic" />
        </div>
        <button
          className={style.editBtn}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>
      <div className={style.accountInfo}>
        <div className="name">
          <input
            disabled={!editMode}
            type="text"
            onChange={(e) => setUserFullName(e.target.value)}
            className={style.accountName}
            value={userFullName}
          ></input>
        </div>
        <div className={style.lastInfo}>
          <form action="/" onSubmit={handelChangeProfile}>
            <div className="user-details">
              <div>
                <label htmlFor="user-email" className={style.usermail}>
                  Email
                </label>
              </div>

              <input
                id="user-email"
                type="email"
                disabled={!editMode}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className={style.accountEmail}
              />
              <div>
                <label htmlFor="user-address" className={style.usermail}>
                  Address
                </label>
              </div>

              <input
                id="user-address"
                type="text"
                onChange={(e) => setUserAddress(e.target.value)}
                disabled={!editMode}
                value={userAddress}
                className={style.accountEmail}
              />
              <div>
                <label htmlFor="user-number" className={style.usermail}>
                  Mobile No
                </label>
              </div>

              <input
                id="user-number"
                type="text"
                disabled
                value={userMobileNumber}
                className={style.accountEmail}
              />
              <div>
                <label htmlFor="user-joining-date" className={style.usermail}>
                  Date Joined
                </label>
              </div>

              <input
                id="user-joining-date"
                type="text"
                disabled
                value={userDateJoined}
                className={style.accountEmail}
              />
            </div>
            {editMode ? (
              <div className={style.btnSubmit}>
                <button type="submit" className={style.saveProfile}>
                  Save
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
      <Loader hide={!showloader} />
    </div>
  );

  function handelChangeProfile(e) {
    e.preventDefault();
    setEditMode(!editMode);
    updateAddress();
    updateProfile(userFullName, userEmail);
  }

  async function fetchAddres() {
    let addressRef = firestore()
      .collection("usersAddress")
      .where("uid", "==", auth().currentUser.uid);
    let address = (await addressRef.get()).docs.map((item) => item.data());
    setUserAddress(address[0].address);
  }
  async function updateAddress() {
    let addressRef = firestore()
      .collection("usersAddress")
      .where("uid", "==", auth().currentUser.uid);
    (await addressRef.get()).docs.map((item) =>
      item.ref.update({ address: userAddress })
    );
  }
}
