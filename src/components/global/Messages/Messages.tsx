import Button from 'components/ui/Button/Button';
import React from 'react';
import { ActionType, useStateContext } from '_state';
import styles from './Messages.module.scss';


const Messages: React.FC = () => {
  const { dispatch } = useStateContext()
  const { active, messages } = useStateContext().state.messages
  // const [ open, setOpen] = React.useState(active);
  // React.useEffect(() => {
  //   setOpen(active)
  // }, [active])
  function toggleMessages() {
    dispatch && dispatch({
      type: ActionType.TOGGLE_MESSAGES,
    })
  }

  function readMessage(id: string) {
    dispatch && dispatch({
      type: ActionType.READ_MESSAGE,
      payload: id,
    })
  }
  function clearMessages() {
    dispatch && dispatch({
      type: ActionType.CLEAR_MESSAGES,
    })
  }

  return (
    <div className={`${styles.Messages} ${active ? styles.active : ''}`}>
    <div className={styles.bg}>
        <div className={styles.content}>
          {/* <Themes /> */}
          <h1>Message Component</h1>
          <Button label={`x`} onClick={toggleMessages} />
          <Button label={`clear`} onClick={clearMessages} />
          <ul className={styles.messages}>
            {messages.map((m, i) => 
            <li key={i}>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
                <Button label={`x`} onClick={() => {readMessage(m.id)}}/>
            </li>
            )}
          </ul>
        </div>
    </div>

  </div>
);
}

export default Messages;
