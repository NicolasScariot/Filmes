import React from 'react';
import { useState, useEffect } from 'react'; // Variáveis de estado (podem mudar)
import {
    Container,
    SearchButton,
    SearchContainer,
    Input,
    Title,
    BannerButton,
    Banner,
    SliderMovie
} from './styles';
import { getListMovies, randomBanner } from '../../utils/movie';

import { ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';
import SliderItem from '../../components/SliderItem';
import api, { key } from '../../services/api';
import { useNavigation } from '@react-navigation/native';


function Home() {


    const [nowMovies, setNowMovies] = useState([]);  // setNowMoveis usadodo para fazer alterações
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannnerMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

        async function getMovies() {
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated', {
                    params: {
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])
            if(isActive){
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(5, popularData.data.results);
                const topList = getListMovies(5, topData.data.results);

                
                setBannnerMovie(nowData.data.results[randomBanner(nowData.data.results)]);
                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);
                setLoading(false); 
            }
        }
        getMovies();

        return () => {
            isActive = false;
            ac.abort();
        }
    },[])

    function navigateDetailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    }

    function handleSearchMovie(){
        if(input === '') return;
        
        navigation.navigate('Search', {name: input })
        setInput('');
    }

    if(loading){
        <Container>
            <ActivityIndicator size="large" color="#FFF"/>
        </Container>
    }
    return (
        <Container>
            <Header title="Nicoflix" />
            <SearchContainer>
                <Input
                    placeholder="Halo"
                    placeholderTextColor="#ddd"
                    value={input}
                    onChangeText={(text) => setBannnerMovie(text)}
                />
                <SearchButton onPress={ handleSearchMovie }>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView showVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>
                <BannerButton activeOpacity={0.7} onPress={() => navigateDetailsPage(bannerMovie)}>
                    <Banner
                        resizeMethodod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />
                </BannerButton>

                <SliderMovie
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} /> }
                    keyExtractor={ (item) => String(item.id)}
                />

                <Title>Populares</Title>
                <SliderMovie
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} /> }
                    keyExtractor={ (item) => String(item.id)}
                />

                <Title>Mais votados</Title>
                <SliderMovie
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} /> }
                    keyExtractor={ (item) => String(item.id)}
                />
            </ScrollView>
        </Container>
    )
}

export default Home;

// instalei : Axios, Stars

// parei no minuto 43