import { TreeItem } from '@mui/lab';

function DirectMessage({ startNodeId, directMsgRooms, joinRoom }) {
  return (
    <TreeItem nodeId={startNodeId} label="DIRECT MESSAGES">
      {directMsgRooms.map((room, idx) => {
        return (
          <TreeItem
            nodeId={room.roomname}
            key={idx}
            label={room?.roomname}
            onClick={joinRoom}
          />
        );
      })}
    </TreeItem>
  );
}

export default DirectMessage;
