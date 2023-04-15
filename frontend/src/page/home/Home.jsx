import Card from '../../component/card/Card'
import Menu from '../../component/menu/Menu'
import Navbar from '../../component/navbar/Navbar'
import './home.css'

const Home = () => {
  return (
    <div className='home-container'>
      <Menu />
      <div className="right-container">
        <Navbar />
        <div className="main">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Home
