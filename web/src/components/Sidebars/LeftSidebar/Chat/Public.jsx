import { TreeItem } from '@mui/lab';

function Public({ publicRooms, joinRoom }) {
  return (
    <TreeItem nodeId="0" label="PUBLIC ROOMS">
      {publicRooms.map((room, idx) => {
        return (
          <TreeItem
            data-testid={`room-${room.roomname}`}
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
export default Public;
