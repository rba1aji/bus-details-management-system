using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BusDetailsSystem.Models
{
    [Keyless]
    // [NotMapped]
    public class PostRequestDetail
    {
        [Required]
        public string? Origin { get; set; }
        [Required]
        public string? Destination { get; set; }

        [Required]
        public string? BusOwner { get; set; }
        public string? BusName { get; set; }
        public string? OriginTime { get; set; }
        public string? DestinationTime { get; set; }
        [Required]
        public string? AuthorName { get; set; }
    }
}