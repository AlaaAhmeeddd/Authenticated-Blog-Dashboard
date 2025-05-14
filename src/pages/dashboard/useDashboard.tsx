import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getPersonalPosts } from '../../utils/http'
import { RootState } from '@/store';

export default function useDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getPersonalPosts(user?.email),
    queryKey: ["posts"],
  });

  return{
    data,
    isError,
    isLoading
  }
}
