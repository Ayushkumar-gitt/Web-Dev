import React from 'react'

const GithubCard = ({ data }) => {

    // console.log(props.data);
    let tagdata = data.tags;
    return (
        <div className='card'>
            <img src={data.image} alt="" />
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <div className='tags'>
            {tagdata.map((tagvalue)=>{
                return <div className='tag'>
                    <h5>{tagvalue}</h5>
                </div>
            })}
            </div>
            <div className='links'>
            <a href={data.repoLink}>Github Repo</a>
            <a href={data.demoLink}>Live Demo</a>
            </div>

        </div>
    )
}

export default GithubCard
