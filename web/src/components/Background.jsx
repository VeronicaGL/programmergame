import backgroundImage from '/images/background.jpg'

const Background = ({ children }) => {
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', 
    zindex: '-1',
    position: 'relative',
  };

  return (

    <div class="bg-no-repeat bg-cover bg-center bg-center" style={backgroundStyles}>{children}</div>

  );
};

export default Background

