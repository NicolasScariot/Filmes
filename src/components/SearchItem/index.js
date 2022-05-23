import React from "react";
import { Container, Banner, Title, RateContainer, Rate } from './styles';
import {Ionicons} from '@expo/vector-icons'




function SearchItem({data, navigatePage }){

    function detailMovie(){
        if(data.realise_date === ''){
            alert('Filme ainda sem data de lançamento')
            return;
        }
        navigatePage(data);
    }
    return(
       <Container activeOpacity={0.7} onPress={detailMovie} >
            {data?.poster_path ? (
                <Banner 
                resizeMethod="resize"
                source={{ uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
                />
            ) : (
                <Banner 
                resizeMethod="resize"
                source={ require('../../assets/foto.jpg')}
                />
            )}

       <Title>{data?.title}</Title>

       <RateContainer>
            <Ionicons name="md-star" size={12} color="#E7A74e" />
            <Rate>{data?.vote_avarage}/10</Rate>
       </RateContainer>
       </Container>
    )
}

export default SearchItem;