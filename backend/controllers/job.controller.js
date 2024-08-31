import { Job } from "../models/job.model.js";


// Recruiters will post the jobs
export const postJob = async(req, res)=>{

    try {
        const {title, description, requirements, salary, experience, location, jobType, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !companyId){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            experience,
            location,
            jobType,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        })


    } catch (error) {
        console.error("Error while posting job", error)
    }
}


// Students will get the jobs
export const getAllJobs = async(req, res)=>{

    try {
        const keyword = req.query.keyword || ""; // Keyword to filter jobs
        const query = {
            $or:[
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});

        if(!jobs){
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })


    } catch (error) {
        console.error("Error while getting jobs", error)
    }
}


// Students will get a particular job
export const getJobById = async(req, res)=>{

    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })


    } catch (error) {
        console.error("Error while getting the job by id", error)
    }
}


// How many jobs have been posted by the recruiter?
export const getJobPostedByRecruiter = async(req, res)=>{

    try {
        const recruiterId = req.id;
        const jobs = await Job.find({created_by: recruiterId});

        if(!jobs){
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })


    } catch (error) {
        console.error("Error while getting the jobs posted by recruiter", error)
    }
}
