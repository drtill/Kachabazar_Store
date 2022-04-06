import ProductServices from '@services/ProductServices';


const Details = ({params}) => {
    const orderId = params.id;
    return (
        <div>
            <h1>Details Page</h1>
            <h8>id = {orderId}</h8>
        </div>
    );
}


export const getServerSideProps = ({ params }) => {
    return {
      props: { params },
    };
  };
    

export default Details;