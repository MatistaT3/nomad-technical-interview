import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';

const ReturnHomeButton: React.FC = () => {
  return (
    <Link href='/'>
      <Button color='secondary'>Volver</Button>
    </Link>
  );
};

export default ReturnHomeButton;
