import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue} from "firebase/database";

const Profile = () => {
    const {roll} = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
    console.log("Working....");
    
    const db=getDatabase();
    const stuValue=ref(db,'students/'+roll);
    onValue(stuValue,(snapshot)=>{
      const data=snapshot.val();
      console.log(data);
      setUser(data);
    })
  }, []);
  return (
    <div>This is {user.name}</div>
  )
}

export default Profile