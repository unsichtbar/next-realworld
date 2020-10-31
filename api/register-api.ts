import { UserModel } from "../models/UserModel";
import { ApiResponse } from "../lib/http/HttpClient";
const uri = "/users";

interface PostRegisterPayload {
  user: {
    email: string;
    username: string;
    password: string;
  };
}
interface RegisterResponse extends ApiResponse {
  user: UserModel;
}

const mapToModel = (api: RegisterResponse) => api.user;
export async function postRegister({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<UserModel> {
  const body: PostRegisterPayload = {
    user: {
      username,
      email,
      password,
    },
  };
  //const res = await HttpClient.post<RegisterResponse>(uri, body);
  const res: RegisterResponse = {
    user: {
      bio: "ich komme aus Amerika",
      email: "alex@example.com",
      token: "ABC.123.456",
      username: "alex",
      image: "https://i.ytimg.com/vi/nlYlNF30bVg/hqdefault.jpg",
    },
  };
  return await mapToModel(res);
}
