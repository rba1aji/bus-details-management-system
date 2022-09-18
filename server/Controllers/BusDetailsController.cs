using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusDetailsSystem.Data;
using BusDetailsSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace BusDetailsSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public BusDetailsController(ApplicationDbContext db)
        {
            _db = db;
        }


        [HttpGet("{travel}")]
        public ActionResult<IEnumerable<BusDetail>> GetBusDtlsByOrgDest(string travel)
        {
            var res = _db.BusDetails?.ToList().FindAll(item => item.Origin == travel.Split("2")[0] && item.Destination == travel.Split("2")[1]);

            return Ok(res);
        }

        [HttpPost]
        public ActionResult<string> PostABusDetail([FromBody] PostRequestDetail Dtl)
        {
            BusDetail newBusDtl = new BusDetail();

            // newBusDtl.Detail = Dtl;
            // newBusDtl.Votes = 0;
            // newBusDtl.PostDate = DateTime.Now.ToString("MM/dd/yyyy");

            newBusDtl.Origin = Dtl.Origin;
            newBusDtl.Destination = Dtl.Destination;
            newBusDtl.Votes = 0;
            newBusDtl.BusOwner = Dtl.BusOwner;
            newBusDtl.BusName = Dtl.BusName;
            newBusDtl.OriginTime = Dtl.OriginTime;
            newBusDtl.DestinationTime = Dtl.DestinationTime;
            newBusDtl.AuthorName = Dtl.AuthorName;
            newBusDtl.PostDate = DateTime.Now.ToString("MM/dd/yyyy");

            _db.BusDetails?.Add(newBusDtl);
            _db.SaveChanges();

            return Ok("A Bus Detail posted successfully");
        }

        [HttpPut("{id}")]
        public ActionResult<string> DoVote(int id, [FromBody] string voteType)
        {
            if (_db.BusDetails?.Find(id) == null)
            {
                return BadRequest("invalid id");
            }

            if (voteType == "up") _db.BusDetails.Find(id)?.upVote();
            else if(voteType == "down") _db.BusDetails.Find(id)?.downVote();
            else return BadRequest("incorrect vote");

            _db.SaveChanges();

            return Ok($"{voteType}Voted");
        }

        [HttpDelete("{id}")]
        public ActionResult<string> DeleteABusDetail(int id)
        {
            var itemToDelete = _db.BusDetails?.Find(id);

            if (itemToDelete == null)
            {
                return BadRequest("invalid id");
            }

            _db.BusDetails?.Remove(itemToDelete);
            _db.SaveChanges();

            return Ok("Deleted succesfully");
        }

    }
}