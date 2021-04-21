
import MainLayout from '../components/layouts/MainLayout';
import OfferUserList from '../components/offers/OfferUserList';
const MyOffers = () => {
    return (
        <MainLayout
            title="Your offer list"
            bgImage="/assets/img/photo-1606011334315-025e4baab810.jpg">
            <OfferUserList />
        </MainLayout>
    )
}

export default MyOffers;