'use client'

import { useCallback, useState } from "react";

type Post = {
  author: string
  date: string
  message: string
}

interface FormElements extends HTMLFormControlsCollection {
  postMessage: HTMLInputElement
}
interface SubmitPostFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const POSTS: Post[] = [
  {
    author: '123',
    message: 'test',
    date: '2024-12-14T23:17:59.053Z',
  },
  {
    author: '123',
    message: 'test1',
    date: '2024-12-14T23:17:59.153Z',
  },
  {
    author: '123',
    message: 'test3',
    date: '2024-12-14T23:17:59.253Z',
  }
]

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(POSTS)
  const [isLogged, setIsLogged] = useState(false)

  const submitPost = useCallback((e: React.FormEvent<SubmitPostFormElement>) => {
    e.preventDefault()
    
    const newPost: Post = {
      author: '123',
      date: (new Date()).toISOString(),
      message: e.currentTarget.elements.postMessage.value
    }

    setPosts(posts => ([...posts, newPost]))

    e.currentTarget.elements.postMessage.value = ''
  }, [])

  if (isLogged === false) {
    return (
      <div className="flex items-center justify-items-center min-h-screen">
        <div className="flex m-auto">
            <button
              type="button"
              onClick={() => {setIsLogged(true)}}
              className="flex items-center rounded-full border justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Connect with 👻
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col max-w-4xl m-auto min-h-screen border-x">
      <div className="w-full border-b p-4">
        <form onSubmit={submitPost}>
          <input className="w-full h-12 mb-2 p-1 text-black" type="area" id="postMessage" placeholder="Escreva uma mensagem" />
          <button className="border px-2 py-1" type="submit">Enviar</button>
        </form>
      </div>
      <div className="w-[100%] border-b min-h-full">
        {posts.map((post, index) => (
          <div className="border-b p-4" key={`${post.date}${index}`}>
            <span>{post.author}</span>
            <p>{post.message}</p>
            <span>{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
