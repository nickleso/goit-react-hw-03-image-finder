import { RotatingLines } from 'react-loader-spinner';
import style from './Loader.module.css';

export const Loader = () => {
  return (
    <section className={style.SectionLoader}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="4"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </section>
  );
};
