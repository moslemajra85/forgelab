// type User = {
//   id: number;
//   username: string;
// };

// const names = ["Adam", "Olga", "Moslem"];
// const users: User[] = [
//   { id: 1, username: "Ad11" },
//   { id: 2, username: "Ol22" },
//   { id: 3, username: "Mos33" },
// ];

// function getFirstItems<T>(items: T[]): T {
//   return items[0];
// }

// const firstName = getFirstItems<string>(names);
// const firstUser = getFirstItems<User>(users);
// import { SignJWT } from "jose";
// type User = {
//   id: number;
//   name: string;
//   username: string;
// };

// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };

// type Todo = {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// };

// async function fetchData<T>(endpoint: string): Promise<T> {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/${endpoint}`,
//   );
//   return response.json();
// }

// // fetchData<Todo>("todos/1").then((data) => console.log(data));
// // fetchData<Post>("posts/1").then((data) => console.log(data));
// // fetchData<User>("users/1").then((data) => console.log(data));

// const secret = new TextEncoder().encode("secret");

// const alg = "HS256";

// async function signInAccessToken(userId: string) {
//   return new SignJWT()
//     .setProtectedHeader({ alg })
//     .setIssuedAt()
//     .setSubject(userId)
//     .setExpirationTime("2h")
//     .sign(secret);
// }

// signInAccessToken('abc123').then(token => console.log(token))

import { expect, test } from "vitest";
function sum(a: number, b: number): number {
  return a + b;
}

test("1 + 2 equals 3", () => {
  expect(sum(1, 2)).toBe(3);
});
