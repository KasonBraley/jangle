import { useEffect, useRef } from 'react';
import MessageStream from '../components/mainContainer/roomchat/MessageStream';
import MessageBar from './components/mainContainer/roomchat./MessageBar';
import CurrentRoom from './components/mainContainer/roomchat./CurrentRoom';

export default function Roomchat() {
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <>
      <div
        className="roomchat-container"
        ref={messageEl}
        data-testid="roomchat-container"
      >
        <CurrentRoom />
        <MessageStream />
      </div>
      <MessageBar />
    </>
  );
}
