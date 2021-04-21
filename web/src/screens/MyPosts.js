import PostUserList from "../components/posts/PostUserList";
import MainLayout from '../components/layouts/MainLayout';

const MyPosts = () => {
    return (
        <div>
            <MainLayout
                title="Your post list"
                bgImage="/assets/img/photo-1441974231531-c6227db76b6e.jpg"
            >
            <PostUserList />
            </MainLayout>
        </div>
    )
}

export default MyPosts;
