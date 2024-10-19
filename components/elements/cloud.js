import styles from '@/styles/Home.module.css'


const Cloud = ({ title, slug, index, cloudTopPositions, onClick }) => {
    return (
      <div
        className={styles.cloud}
        style={{ animationDelay: `${index * 10}s`, top: `${cloudTopPositions[Math.floor(Math.random() * cloudTopPositions.length)]}px` }}
        onClick={onClick}
      >
        <h3 className={styles.title}>
          {title} <span><br /><small>*click me*</small></span>
        </h3>
      </div>
    );
  };
  
  export default Cloud;