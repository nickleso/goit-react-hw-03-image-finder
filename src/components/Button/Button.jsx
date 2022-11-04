import style from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={style.ButtonWrap}>
      <button onClick={onClick} type="button" className={style.Button}>
        Load more
      </button>
    </div>
  );
};
