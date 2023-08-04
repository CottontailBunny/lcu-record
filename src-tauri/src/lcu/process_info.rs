use base64::{engine::general_purpose, Engine};
use std::{error::Error, fmt, fmt::Display};
use sysinfo::{ProcessExt, System, SystemExt};


#[derive(Debug, Clone)]
pub(crate) enum ProcessInfoError {
    /// League client has not been started
    ProcessNotAvailable,
    /// There has been an error getting the API port
    PortNotFound,
    /// There has been an error getting the API auth token
    AuthTokenNotFound,
}

impl Error for ProcessInfoError {}

impl Display for ProcessInfoError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::ProcessNotAvailable => write!(
                f,
                "{:?}: Riot/League client process could not be found",
                self
            ),
            Self::PortNotFound => write!(
                f,
                "{:?}: API port could not be parsed from process arguments",
                self
            ),
            Self::AuthTokenNotFound => write!(
                f,
                "{:?}: API auth token could not be parsed from process arguments",
                self
            ),
        }
    }
}

const TARGET_PROCESS: &str = "LeagueClientUx.exe";

pub(crate) fn get_auth_info() -> Result<(String, String), ProcessInfoError> {

    let mut sys: System = System::new_all();
    sys.refresh_processes();
    let process = sys
        .processes()
        .values()
        .find(|p| p.name() == TARGET_PROCESS);

    let args: &[String] = process
        .map(|p: &sysinfo::Process| p.cmd())
        .ok_or(ProcessInfoError::ProcessNotAvailable)?;

    let port = args
        .iter()
        .find(|arg| arg.starts_with("--app-port="))
        .map(|arg| arg.strip_prefix("--app-port=").unwrap().to_string())
        .ok_or(ProcessInfoError::PortNotFound)?;
    let auth_token: String = args
        .iter()
        .find(|arg| arg.starts_with("--remoting-auth-token="))
        .map(|arg| {
            arg.strip_prefix("--remoting-auth-token=")
                .unwrap()
                .to_string()
        })
        .ok_or(ProcessInfoError::AuthTokenNotFound)?;
         println!("{:?}{:?}", port,auth_token);
    Ok((
        general_purpose::STANDARD.encode(format!("riot:{}", auth_token)),
        port,
    ))
}
