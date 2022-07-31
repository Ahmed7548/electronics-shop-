
interface PropType{
  title: string;
  imageUrl: string;
  className?: string;
}

const ImageCard = ({ title, imageUrl, className}:PropType) => {
  return (
    <div className={`bc-img-fit image-card layer position-relative ${className}`}  style={{backgroundImage:`url(${imageUrl})`}}>
      <h3 className=''>
        {title}
      </h3>
    </div>
  )
}

export default ImageCard