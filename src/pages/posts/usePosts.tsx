import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../utils/http';

export default function usePosts() {
  const { data, isError, isLoading } = useQuery({
    queryFn: getPosts,
    queryKey: ['posts']
  });

  return{
    data, 
    isError,
    isLoading
  }
}
