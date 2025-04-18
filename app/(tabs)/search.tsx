import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { featchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSeachCount } from '@/services/appwrite'

const search = () => {
  const [searchQuery , setSearchQuery]= useState('');
  const {data:movies, loading , error, refetch : loadmovies, reset } = useFetch(()=> featchMovies({query:searchQuery}), false);

  useEffect(()=>{
    const timeoutId =setTimeout(async ()=>{
      if(searchQuery.trim()){
        await loadmovies();
        if(movies?.length > 0 && movies?.[0]){
          await updateSeachCount(searchQuery,movies[0]);
        }
      }
      else{
        reset();
      }},700)

      return () => clearTimeout(timeoutId); 
  },[searchQuery])
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' />

      <FlatList  
      data={movies} 
      renderItem={({item}) => <MovieCard {...item} />}
      keyExtractor={(item)=>item.id}
      numColumns={3}
      ListEmptyComponent={
        !loading && !error ? (
          <View className='mt-10 px-5'>
            <Text className='text-center text-gray-500'>
              {searchQuery.trim()? "No movies found" : "Search for a movie"}
            </Text>
          </View>
        ) : null
      }
      columnWrapperStyle = {{
        justifyContent : 'center',
        gap : 16,
        marginVertical : 16
      }}
       contentContainerStyle = {{paddingBottom : 100}}
       ListHeaderComponent={
        <>
        <View className='w-full flex-row justify-center items-center mt-20'>
          <Image source={icons.logo} className='w-12 h-10'/>
        </View>
        <View className='my-5'>
          <SearchBar 
          placeholder='Search movies...' 
          value = {searchQuery} 
          onChangeText = {(text :string) =>setSearchQuery(text)} />
        </View>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" className='my-3' />
        )}
        {error && (
          <Text className='text-red-500 px-5 my-3'>
            Error : {error.message}
          </Text>
        )}
        {!loading && ! error && searchQuery.trim() && movies?.length > 0 && (
          <Text className='text-xl text-white font-bold ml-2'>
            Seach Results for : 
            <Text className='text-accent'>
              {searchQuery}
              </Text> 
          </Text>
        )}
        </>
       }
      />
    </View>
  )
}

export default search