// Actions
const ADD_MESSAGE_TO_ROOM = 'ADD_MESSAGE_TO_ROOM';
const SET_ROOMS = 'READ_ROOMS';
const SET_ROOM_MESSAGES = 'SET_ROOM_MESSAGES';

let initialState = {
  rooms: new Map().set('general', []),
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_MESSAGES:
      state.rooms.set(action.payload.roomname, action.payload.messages);
      return state;
    case ADD_MESSAGE_TO_ROOM:
      if (state.rooms.has(action.payload.roomname)) {
        state.rooms.set(action.payload.roomname, [
          ...state.rooms.get(action.payload.roomname),
          action.payload,
        ]);
      } else {
        state.rooms.set(action.payload.roomname, [action.payload]);
      }
      return state;
    case SET_ROOMS:
      action.rooms.forEach((room) => {
        if (!state.rooms.has(room.roomname)) {
          state.rooms.set(room.roomname, []);
        }
      });
      return state;
    default:
      return state;
  }
}

// Action Creators
export const setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    rooms,
  };
};

export const addMessageToRoom = (payload) => {
  return {
    type: ADD_MESSAGE_TO_ROOM,
    payload,
  };
};

export const setRoomMessages = (payload) => {
  return {
    type: SET_ROOM_MESSAGES,
    payload,
  };
};
