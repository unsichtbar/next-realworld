import React from "react";
import { useRouter } from 'next/router'
import { Article, ArticleDisplay } from "../article/view/[articleId]";
import {
  useProfile,
  useProfileArticles,
  useProfilesFavoritedArticles,
} from "../../../api/profiles-api";
import { Tab, Tabs } from "../../../components/tabs/tabs";

export const Profile: React.FC<any> = (props) => {
  const { id }: { id: string } = useRouter().query as any
  const { isLoading, isError, data, error } = useProfile(id);
  const profileArticles = useProfileArticles({ author: id });
  const profileFavoritedArticles = useProfilesFavoritedArticles({
    favoritedBy: id,
  });

  function followUser() {
    alert("user followed");
  }
  function unfollowUser() {
    alert("user unfollowed");
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Ooops. something bad happened</div>;
  if (data) {
    return (
      <div>
        <div>
          <div>{data.username}</div>
          <img
            src={data.image}
            alt={data.username + "'s profile image."}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div>{data.bio}</div>
        {data.following ? (
          <div onClick={unfollowUser}>Unfollow {data.username}</div>
        ) : (
          <div onClick={followUser}>Follow {data.username}</div>
        )}

        <section>
          <Tabs selectedTab="Articles">
            <Tab title="Articles">
              <div className="profile-articles">
                {profileArticles.isFetched && (
                  <div>
                    {profileArticles.data?.map((article) => (
                      <ArticleDisplay key={article.slug} article={article} />
                    ))}
                  </div>
                )}
              </div>
            </Tab>
            <Tab title="Favorited Articles">
              <div className="favorited-articles">
                {profileFavoritedArticles.data?.map((article) => (
                  <ArticleDisplay key={article.slug} article={article} />
                ))}
              </div>
            </Tab>
          </Tabs>
        </section>
      </div>
    );
  }
  return <div>{id}</div>;
};

export default Profile