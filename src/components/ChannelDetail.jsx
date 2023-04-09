import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Videos, ChannelCard } from './';
import { fetchFromAPI } from './utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box
        style={{
          background:
            'linear-gradient(90deg, rgba(242,1,27,1) 0%, rgba(190,1,43,1) 17%, rgba(57,8,8,1) 63%)',
          zIndex: 10,
          height: '300px',
        }}
      />
      <ChannelCard
        channelDetail={channelDetail}
        marginTop="-110px"
      ></ChannelCard>

      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos}></Videos>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
