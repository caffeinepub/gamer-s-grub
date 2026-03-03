import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let contactSubmissions = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    if (name.size() == 0 or email.size() == 0 or message.size() == 0) {
      Runtime.trap("All fields are required");
    };

    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };

    contactSubmissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    contactSubmissions.toArray();
  };
};
