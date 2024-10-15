import React, { useEffect, useState } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarOption from './SidebarOption';
import db from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './Sidebar.css';
import { useStateValue } from '../../StateProvider/StateProvider';  // -- (1/3)

const Sidebar = () => {

    const [channels, setChannels] = useState([]);
    const [{ user }] = useStateValue();   // -- (2/3)


    // connect to DB
    useEffect(() => {
        onSnapshot(collection(db, 'channels'), (snapshot) => {
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }))
            );
        }, []);
    });

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <div className='sidebar_info'>
                    <h2>Connect</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {/* "displayName" function or the "user", this is not from the DB, rather it is from the google authentication service providing actual google account info */}
                        {user?.displayName}  {/*  -- (3/3) */}
                    </h3>
                </div>
                <CreateIcon />
            </div>
            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
            <SidebarOption Icon={DraftsIcon} title="Saved items" />
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
            <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
            <SidebarOption Icon={AppsIcon} title="Apps" />
            <SidebarOption Icon={FileCopyIcon} title="File browser" />
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

            {/* Connect to db t list all Channels */}
            {/* SidebarOption ... */}

            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}

        </div>
    )
}

export default Sidebar;
