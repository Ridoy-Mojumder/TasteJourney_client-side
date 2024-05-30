import { useEffect, useState } from "react";
import Marquee from "react-marquee-slider";

const MeetOurMemberAndChef = () => {
    const [teamMember, setTeamMember] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://taste-journey-server-side.vercel.app/teamMember`)
            .then(res => res.json())
            .then(data => {
                setTeamMember(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching team members:", error);
                setError(error.toString());
                setIsLoading(false);
            });
    }, [setTeamMember]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1 className="text-5xl font-semibold text-[#52c9af] my-10 text-center font-dancing relative">
                Meet with our Member
                <span className="absolute left-1/2 transform -translate-x-1/2 h-px w-96 -bottom-4 bg-[#52c9af]"></span>
            </h1>
            <div style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 0, 100% 70%, 50% 100%, 0% 70%, 0 0)" }} className="bg-[#cfebe5] p-4  ">

                {teamMember && teamMember.length > 0 ? (
                    <div className="flex">
                        <Marquee pauseOnHover={true} speed={130} gradient={false} className="bg-white dark:bg-gray-800">
                            {teamMember.map((member, index) => (
                                <div key={index} className="m-10 w-96">
                                    <div className="max-w-md p-6 shadow-lg rounded-lg bg-white dark:bg-gray-300">
                                        <div className="space-y-4">
                                            <img src={member.image} alt={member.name} className="block object-cover object-center w-full rounded-md h-56 shadow-sm dark:bg-gray-500" />
                                            <div>
                                                <h3 className="text-lg font-semibold dark:text-gray-900">{member.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-700">{member.position}</p>
                                                <a href="#" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">View Profile</a>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-md font-medium dark:text-violet-600">{member.others.email}</p>
                                                <p className="text-md font-medium dark:text-violet-600">{member.others.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Marquee>
                    </div>

                ) : (
                    <div>No team members found.</div>
                )}


            </div>

        </>
    );
};

export default MeetOurMemberAndChef;
