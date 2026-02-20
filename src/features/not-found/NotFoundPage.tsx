import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'

const NotFoundPage = () => (
  <Card className="products-state" style={{ textAlign: 'center' }}>
    <h2>Lost in space</h2>
    <p>The page you were looking for does not exist.</p>
    <Link className="btn btn--primary" to="/">
      Return home
    </Link>
  </Card>
)

export default NotFoundPage
