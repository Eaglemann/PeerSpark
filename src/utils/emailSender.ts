export const sendMatchEmail = (
  userName: string,
  userEmail: string,
  matchedUserName: string
) => {
  console.log(`Sending email to ${userEmail}`);
  console.log(`Subject: Match Request from ${userName}`);
  console.log(
    `Body: Hello ${matchedUserName},\n\n${userName} wants to match with you!`
  );
};
