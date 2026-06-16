class Creadentials {
  email: string;
  password: string;
}

export class SignUpCreadentials extends Creadentials {
  name: string;
  lastname: string;
}

export class SignInCreadentials extends Creadentials {}
