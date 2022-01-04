import { useEffect, useRef } from 'react';
import MessageStream from './MessageStream';
import MessageBar from './MessageBar';
import CurrentRoom from './CurrentRoom';

const Roomchat = () => {
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
};

export default Roomchat;
