import { Typography } from "@mui/material";
type RecentConversionListProps = {
  recentList: string[];
};

const RecentConversionList = ({ recentList }: RecentConversionListProps) => {
  return (
    <>
      {recentList?.map((listItem) => (
        <Typography>{listItem}</Typography>
      ))}
    </>
  );
};

export default RecentConversionList;
