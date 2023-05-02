import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";

interface Member{
    name: string;
    position: string;
    imgLink: string;
    description: string;
    social: {
        github: string;
        linkedin: string;
    }
}

const TeamMember = ({ name, position, imgLink, description, social }: Member) => (
    <div className="w-[calc(50%-2rem)] flex flex-col gap-2 justify-center items-center">
        <h2 className="text-4xl text-[var(--title-txt-color)]">{name}</h2>
        <p className="text-xl">{position}</p>

        <div className="rounded-full w-fit shadow-2xl my-6 relative">
            <Image width={220} height={220} alt={name} src={imgLink}
            className="rounded-full" />

            <div className="absolute flex items-center gap-2 -right-8 -bottom-2">
                <Link href={social.github} target="_blank">
                    <BsGithub className="text-3xl text-black hover:text-gray-700 transition-all duration-300" />
                </Link>

                <Link href={social.linkedin} target="_blank">
                    <BsLinkedin className="text-3xl text-[#0072b1] hover:text-[#215e7f] transition-all duration-300" />
                </Link>
            </div>
        </div>

        <p className="text-justify leading-7 font-[400]">{description}</p>
    </div>
)

const Team = () => {
    return ( 
        <>
            <Head>
                <title>Tim | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Tim iza nauciProgramiranje.ba'
                    description='Iskusni pojedinci. Snažan tim. Moćna platforma.'
                    hasCode={false}
                    btn={{
                        btnText: 'Upiši se na kurs',
                        btnIcon: <FaCreditCard />,
                        btnAction: '/kupovina'
                    }}
                />
            </main>

            <Container>
                <div className="w-full flex flex-wrap gap-16 items-center justify-center">
                    <TeamMember 
                        name="Edin Šahbaz" 
                        position="Osnivač i CEO" 
                        imgLink="/team/EdinSahbaz.jpeg"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia anim id est laborum."
                        social={{
                            github: "https://github.com/edinSahbaz",
                            linkedin: "https://www.linkedin.com/in/edinsahbaz/"
                        }}
                    />

                    <TeamMember 
                        name="John Doe" 
                        position="CTO" 
                        imgLink="/team/blank.jpeg"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia anim id est laborum."
                        social={{
                            github: "https://github.com",
                            linkedin: "https://www.linkedin.com"
                        }}
                    />

                    <TeamMember 
                        name="Sam Smith" 
                        position="COO" 
                        imgLink="/team/blank.jpeg"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia anim id est laborum."
                        social={{
                            github: "https://github.com",
                            linkedin: "https://www.linkedin.com"
                        }}
                    />

                    <TeamMember 
                        name="Tom Harry" 
                        position="Predavač i instruktor" 
                        imgLink="/team/blank.jpeg"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia anim id est laborum."
                        social={{
                            github: "https://github.com",
                            linkedin: "https://www.linkedin.com"
                        }}
                    />
                </div>
            </Container>
        </>
     );
}
 
export default Team;