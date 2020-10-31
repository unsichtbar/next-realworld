import { useQuery } from "react-query";
import { HttpClient, useHttpClient } from "../lib/http/HttpClient";
import { ArticleModel } from "../models/ArticleModel";
import { ProfileModel } from "../models/ProfileModel";
interface ProfileResponse {
  profile: ProfileModel;
}

export function useProfile(profile: string) {
  const httpClient = useHttpClient();
  return useQuery(["profile", profile], getProfile(httpClient));
}
function getProfile(httpClient: HttpClient) {
  return async function (profile: string): Promise<ProfileModel> {
    const res: ProfileResponse = {
      profile: {
        username: "alex",
        bio: "I dont work here bucko",
        image:
          "https://www.sbs.com.au/topics/sites/sbs.com.au.topics/files/goat.jpg",
        following: false,
      },
    };
    const mapped = mapToDomain(res);
    return await mapped;
  };
}

function mapToDomain(res: ProfileResponse): ProfileModel {
  return res.profile;
}

interface ProfileArticlesQueryParams {
  author: string;
}

interface ProfileArticlesQueryResponse {
  articles: ArticleModel[];
  articlesCount: number;
}

export function useProfileArticles(params: ProfileArticlesQueryParams) {
  const httpClient = useHttpClient();
  return useQuery(["profileArticles", params], getProfileArticles(httpClient));
}

function getProfileArticles(httpClient: HttpClient) {
  return async function (
    params: ProfileArticlesQueryParams
  ): Promise<ArticleModel[]> {
    const res: ProfileArticlesQueryResponse = {
      articles: [
        {
          slug: "how-to-train-your-dragon",
          title: "How to train your dragon",
          description: "Ever wonder how?",
          body: "It takes a Jacobian",
          tagList: ["dragons", "training"],
          createdAt: new Date(),
          updatedAt: new Date(),
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at statefarm",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false,
          },
        },
        {
          slug: "how-to-train-your-dragon-2",
          title: "How to train your dragon 2",
          description: "So toothless",
          body: "It a dragon",
          tagList: ["dragons", "training"],
          createdAt: new Date("2016-02-18T03:22:56.637Z"),
          updatedAt: new Date("2016-02-18T03:48:35.824Z"),
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at statefarm",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false,
          },
        },
      ],
      articlesCount: 2,
    };

    //await HttpClient.get<ProfileArticlesQueryResponse>(`/articles?author=${params.author}`)
    return res.articles;
  };
}

export function useProfilesFavoritedArticles(params: { favoritedBy: string }) {
  const httpClient = useHttpClient();
  return useQuery(
    ["profileFavoritedArticles", params],
    getProfilesFavoritedArticles(httpClient)
  );
}

function getProfilesFavoritedArticles(httpClient: HttpClient) {
  return async function (params: {
    favoritedBy: string;
  }): Promise<ArticleModel[]> {
    const res: ProfileArticlesQueryResponse = {
      articles: [
        {
          slug: "how-to-train-your-dragon",
          title: "How to train your dragon",
          description: "Ever wonder how?",
          body: "something completely different",
          tagList: ["dragons", "training"],
          createdAt: new Date(),
          updatedAt: new Date(),
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at statefarm",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false,
          },
        },
        {
          slug: "how-to-train-your-dragon-2",
          title: "How to train your dragon 2",
          description: "So toothless",
          body: "It a dragon",
          tagList: ["dragons", "training"],
          createdAt: new Date("2016-02-18T03:22:56.637Z"),
          updatedAt: new Date("2016-02-18T03:48:35.824Z"),
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "jake",
            bio: "I work at statefarm",
            image: "https://i.stack.imgur.com/xHWG8.jpg",
            following: false,
          },
        },
      ],
      articlesCount: 2,
    };
    // await HttpClient.get<ProfileArticlesQueryResponse>(`/articles?favorited=${params.favoritedBy}`)
    return res.articles;
  };
}
