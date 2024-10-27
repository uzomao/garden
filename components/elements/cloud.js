import styles from '@/styles/Home.module.css'


const Cloud = ({ title, index, cloudTopPositions, onClick, numClouds }) => {

  const animationDuration = 30
  const animationDelay = animationDuration/numClouds

  const thoughtCloudPositions = [10, 100, 25, 80, 15, 60, 20, 40, 10]

  return (
    <div
      className={styles.cloud}
      style={{ 
        animationDelay: `${index * animationDelay}s`, 
        top: `${thoughtCloudPositions[index]}px` 
      }}
      onClick={onClick}
    >
      <h3 className={styles.title}>
        {title}
      </h3>
    </div>
  );
};

export default Cloud;