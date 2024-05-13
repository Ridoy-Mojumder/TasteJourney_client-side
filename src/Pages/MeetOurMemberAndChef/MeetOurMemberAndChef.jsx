import { useEffect, useState } from "react";
import Marquee from "react-marquee-slider";

const MeetOurMemberAndChef = () => {
    const [teamMember, setTeamMember] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/teamMember`)
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
                        <Marquee pauseOnHover={true} speed={130} >
                            {teamMember.map((member, index) => (
                                <div key={index} className="m-20">
                                    <div className="max-w-lg p-4 shadow-md dark:bg-gray-300 dark:text-gray-800">
                                        <div className="flex justify-between pb-4 border-bottom">
                                            <div className="flex items-center">
                                                <a rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-800">{member.position}</a>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <img src={member.image} alt="" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                                            </div>
                                            <div className="space-y-2">
                                                <a rel="noopener noreferrer" href="#" className="block">
                                                    <h3 className="text-xl font-semibold dark:text-violet-600">{member.others.email}</h3>
                                                    <h3 className="text-xl font-semibold dark:text-violet-600">{member.others.phone}</h3>
                                                </a>
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
