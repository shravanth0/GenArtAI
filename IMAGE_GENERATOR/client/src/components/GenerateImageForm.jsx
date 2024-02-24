import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './button';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateAIImage, CreatePost } from '../api';



const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content: center;
`;
const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary }
`;

const Action = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;

`;

const GenerateImageForm = ({
    post,
    setPost, 
    createPostLoading,
    setCreatePostLoading,
    generateImageLoading,
    setGenerateImageLoading,
    
    }) => {
        const navigate = useNavigate();
        const [error, setError] = useState("")
        const generateImageFun = async () => {
            setGenerateImageLoading(true);
            await GenerateAIImage({ prompt: post.prompt })
            .then((res) => {
                setPost({ 
                    ...post, 
                    photo: `data:image/jpge;base64,${res?.data?.photo}`,
                });
                setGenerateImageLoading(false);
            }).catch((error) => {
                setError(error?.response?.data?.message);
                setGenerateImageLoading(false);
            });
        };

        
        const createPostFun= async () =>{
            setCreatePostLoading(true);
            await CreatePost( post )
            .then((res) => {
                setCreatePostLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setError(error?.response?.data?.message);
                setCreatePostLoading(false);
            });
        };

  return (
    <Form>
        <Top>
            <Title> Generate Image with Prompt </Title>
            <Desc>Write your prompt here according to the Image you want to Generate!. </Desc>
        </Top>
        <Body>
            <TextInput 
            label = "Author" 
            placeholder=" Enter your Name"
            author= "author"
            value={post.author}
            handelChange={ (e) => setPost({...post, author: e.target.value})}
            />
             <TextInput 
            label = "Image Prompt" 
            placeholder=" Write a detailed prompt of image you what to generate . . . "
            Prompt= "prompt"
            rows="8"
            textArea
            value={post.prompt}
            handelChange={(e) => setPost({...post, prompt: e.target.value})}
            
            />
            {error && <div style={{color: 'red'}}>{error}</div>}
            ** You can post the AI Generated Image to the Community **
        </Body>
        <Action>
            <Button text= "Generate Image" flex 
                leftIcon={ <AutoAwesome/>}
                isLoading={generateImageLoading}
                isDisabled={post.prompt === ""}
                onClick={() => generateImageFun()}
            />
            <Button text= "Post Image" flex 
                type="secondary" 
                leftIcon={ <CreateRounded/> }
                isLoading={createPostLoading}
                isDisabled={post.author === "" || post.prompt === "" || post.photo === ""}
                onClick={()=>createPostFun()}
            />
        </Action>
    </Form>
  );
};

export default GenerateImageForm;