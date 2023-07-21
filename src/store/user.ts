import * as remx from "remx";
import { User } from "../types/user";

type UserState = {
  user: User | undefined;
};

const initialUserState: UserState = {
  user: undefined,
};

const userState = remx.state(initialUserState);

const userSetters = remx.setters({
  setUser(user: User) {
    userState.user = user;
  },

  logout() {
    userState.user = undefined;
  },
});

const userGetters = remx.getters({
  getUser(): { user?: User } {
    const { user } = userState;
    return { user };
  },
});

export const userStore = {
  ...userSetters,
  ...userGetters,
};
