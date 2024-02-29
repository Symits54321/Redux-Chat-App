import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function LogoImg({images}) {
  return (
    <Container style={{display:'flex'}}>
     
       {images.map((img)=>(
        <div  style={{ width: 50, height: 50 ,borderRadius:50, overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'}} >
          <Image 
           src={img.imageUrl} style={{ width: 60, height: 'auto' }} rounded/>
        </div>
       )
      )}
       
    
    </Container>
  );
}

export default LogoImg;